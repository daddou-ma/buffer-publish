# @bufferapp/publish-sidebar

This package acts like a shim around the `@bufferapp/app-sidebar` to allow us to inject additional logic around 
showing / hiding the sidebar aditional components, including pieces such as

- upgrade to pro
- return to classic publish

Without breaking the flow of the AppSidebar, and without holding unnecessary state in the route component
