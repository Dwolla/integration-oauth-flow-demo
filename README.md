# Dwolla Integrations OAuth Flow Demo
A partner integration allows a Dwolla API Client to authenticate with Dwolla and authorize a third party application to interact with data stored in Dwolla via the application's user interface. With this authorization, you have the ability to create or view resources, or even receive webhooks.

Dwolla uses OpenID Connect which is a layer built on top of the OAuth 2.0 protocol to facilitate this authorization. The OpenID Connect flow is designed for web applications which leverages a browser-based interaction for user authentication.

### Table of Contents
* [Installation and Setup](#installation-and-setup)
* [Sandbox Configurations](#sandbox-configurations)
* [Request Authorization](#request-authorization)
* [Usage](#usage)
* [Additional Resources](#further-resources)
* [Support](#support)
* [Contributing](#contributing-and-reporting-bugs)
* [License](#license)

### Installation and Setup
Use the package manager `npm` to install the required dependencies.

`npm install`

You will also need to have a Dwolla Sandbox account to retrieve your Dwolla Key and Secret. 

Sign up for a Dwolla Sandbox account and verify your email address. Once completed, navigate to the `applications` tab within the dashboard to retrieve your Key/Secret.

![Application credentials](application.png "Sandbox application credentials")

### Sandbox Configurations
In order to get approved for the Dwolla Partnership Integrations, you will need to email `partnerships@dwolla.com` with the following fields.
* Subject line of: `Enable Sandbox Integrator`
* The email address you signed up with in Sandbox.
* The name of your Integration Application in Sandbox.
* The redirect URI that the authorization flow will redirect to after a Dwolla client grants permission to your integration. The redirect URI will be the endpoint that will handle receiving the code from Dwolla during the OpenID/OAuth flow.
* A logo to display with your integration. The logo should be a square high-res transparent PNG or JPG that is 150+ DPI (For example, 60px by 60px).
* A description that will be shown with your integration in Sandbox. (Optional, but recommended).
* A sign-up URL on your application that Dwolla Clients will be redirected to when enabling your integration. It is recommended you have users either login or (sign up for) your integration on this page. After you’ve authenticated the user, you will start the OpenID/OAuth flow with Dwolla. (Optional, but recommended).
* An informational URL that is a page on your application where Dwolla Clients can learn more about your integration. There is a “Learn More” link on your integration in Sandbox that will link to this URL. (Optional, but recommended).

Dwolla will alert you of the activation of your application via email. Once completed, you can move to the next steps.

### Request Authorization
Dwolla API Clients will need to accept authorization from your Integration in order for your integration to be able to read, write, or transact. Access tokens are short lived, and are only valid for one hour.

You will now want to add your clientId, clientSecret, and redirectURI to the project, being sure to url-encode all querystrings.

To start the OpenID flow, construct the initiation URL which the user will visit in order to grant permission to your application. It describes who the Integration Application is (client_id), and where the user should be redirected to after they grant or deny permissions to your application (redirect_uri).

Example URL Format
https://accounts-sandbox.dwolla.com/auth?client_id={clientId}&redirect_uri={redirectUri}&response_type=code

For more information on these querystring parameters, visit our developer docs.

### Usage
Once the dependencies are installed, you can run `npm start` to start the application. 
You will then be able to access it at localhost:9000/auth. 

#### Request Authorization from API Client

###### The API Client will log into their dashboard
![Request authorization](request_auth.png "Request authorization from API client")

###### Grant Authorization to this partner app
![Grant authorization](grant_auth.png "Grant authorization to this partner app")

###### Receive Code
![Receive code](receive_code.png "Receive code")

#### Next Steps
After receiving this code, you can now exchange this for an access token and refresh token pair. Check out our docs to learn more on these next steps.

### Further Resources
The Dwolla Developer portal is your go-to resource to learn more about the Dwolla API and its implementation. 

#### Documentation for Dwolla Partner Integrations

##### Dwolla Partner Integrations
* Resources specific to a Partner Integration, including how to exchange the `code` you received for an access token

#### Documentation for the Dwolla API
##### [Dwolla API Reference](https://docs.dwolla.com/)
* High level docs on every endpoint and API request/response

##### [Dwolla API Guides](https://developers.dwolla.com/guides/)
* Step-by-step guides on building the integration

##### [Dwolla API Articles](https://developers.dwolla.com/resources/)
* Articles to help get started understanding the Dwolla API and to help gather requirements

### Support
Support queries can be directed to our Developer Forum. 

### Contributing and Reporting Bugs
Feel free to fork this repo and submit PRs for any corrections, new features, etc. you think we should include.

### License
The MIT License (MIT)

Copyright (c) 2019 Dwolla, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
