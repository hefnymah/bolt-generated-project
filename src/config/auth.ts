import { Configuration, PublicClientApplication } from "@azure/msal-browser";

const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_AZURE_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_AZURE_TENANT_NAME}.onmicrosoft.com/${import.meta.env.VITE_AZURE_POLICY_NAME}`,
    knownAuthorities: [`${import.meta.env.VITE_AZURE_TENANT_NAME}.b2clogin.com`],
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_REDIRECT_URI,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
      logLevel: 3
    }
  }
};

export const loginRequest = {
  scopes: ["openid", "profile"]
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic when multiple accounts are present
msalInstance.initialize().then(() => {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
});

export { msalConfig };
