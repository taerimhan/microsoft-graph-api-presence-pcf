# Microsoft Graph API User Presences PCF
A control that demonostrates how Microsoft Graph API can be consumed in PCF control. It allows a user to sign-in and retrieve permitted Microsoft Graph resources.

 # Configuration
 1. Customize Users (systemuser) view that includes "Azure AD Object ID" attribute.
   ![Create View](/microsoft-graph-api-presence-pcf/docs/Configure-SystemUser-View.png)
 2. Add a sub-grid on your form, set the data source to the Users view. 
 3. Add the custom control to the sub-grid control. 
   ![Add Control](/microsoft-graph-api-presence-pcf/docs/Configure-Add-Control.png)
 3. Configure the custom control properties (more detail in the post linked below).
   ![Control Properties](/microsoft-graph-api-presence-pcf/docs/Control-Properties.png)
 4. Save and publish. 
 
# Demo
![PCF Component](/microsoft-graph-api-presence-pcf/docs/Demo-UserPresences.png)

# Blog Post
More in depth explanation of the PCF control in this [post](https://taerimhan.com/consuming-microsoft-graph-api-from-pcf-control).

# Releases
Latest solutions are found in [Releases](https://github.com/taerimhan/microsoft-graph-api-presence-pcf/releases).