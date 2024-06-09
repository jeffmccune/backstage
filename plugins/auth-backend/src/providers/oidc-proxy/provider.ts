/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  OidcProxyResult,
  oidcProxyAuthenticator,
} from '@backstage/plugin-auth-backend-module-oidc-proxy-provider';
import {
  SignInResolver,
  createProxyAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { AuthHandler } from '../types';
import { createAuthProviderIntegration } from '../createAuthProviderIntegration';

/**
 * Auth provider integration for integrations that provide an oidc id token in a
 * http request header.
 *
 * @public
 */
export const oidcProxy = createAuthProviderIntegration({
  create(options: {
    /**
     * The profile transformation function used to verify and convert the auth
     * response into the profile that will be presented to the user. The default
     * implementation just provides the authenticated email that the IAP
     * presented.
     */
    authHandler?: AuthHandler<OidcProxyResult>;

    /**
     * Configures sign-in for this provider.
     */
    signIn: {
      /**
       * Maps an auth result to a Backstage identity for the user.
       */
      resolver: SignInResolver<OidcProxyResult>;
    };
  }) {
    return createProxyAuthProviderFactory({
      authenticator: oidcProxyAuthenticator,
      profileTransform: options.authHandler,
      signInResolver: options.signIn.resolver,
    });
  },
});
