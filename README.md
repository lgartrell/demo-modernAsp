# Overview
This is a modern example of an ASP.NET (6.0) web server, built with modern standards. The server routes wildcard traffic to the react SPA entrypoint, while maintaining the ability to create any number of endpoints (controllers) as needed.

### Required Tools (tested with latest packages, should be backwards compatible to 5.0 at least, most likely further)
* NPM (latest)
* Node (latest)
* .NET 6.0 (latest)

## Initial Setup
* Open your command line flavor of choice (I use cmder)
* Navigate to the root directory of the Client/ folder
* Run "npm install" to pull down the node packages
* Run "npm run build" to transform the SPA into the webpack bundle consumed by the web api
* From here, you are good to go! an ignored build/ folder should be present in your visual studio explorer window
   * ![image](https://github.com/lgartrell/demo-modernAsp/assets/48131540/03f925bb-128a-4af5-9965-91344cc8732f)
 * 

### How to run once initial set up is complete
* Open the solution demo-modernAsp in visual studio
* If it is not already set, set the .csproj demo-ModernAsp as your startup project
* From there, you can click the green arrow to run the webserver, and an IIS Express instance should show the site!
* On the first run, you may be prompted to accept the development HTTPs certificate, to use HTTPs in the dev environment

# Final words
I am really happy with how the demo site turned out, but there is still a lot of polish and additional work that I would complete if this wasn't a "time limited" project. In total I spent around 16 hours on the work presented in this repo, and I have to call it somewhere! Let me know what you like, and what you don't like!
