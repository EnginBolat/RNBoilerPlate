## Features
React Navigation and Redux integration
Axios for handling network requests
i18n support (multi-language support)
SVG and other media support
Project Structure
The project is organized into the following main directories:

- assets: Static assets like images and icons
- components: Reusable UI components like buttons, sheets, etc.
- core: Core functionality such as i18n (internationalization) configuration
- hooks: Custom React hooks, including the useNativeBackHandler
- providers: Context providers, such as LocalizationProvider and UserInactivityProvider
- screens: Screen components that represent the main views in the app
- stacks: Navigation stacks, such as the main navigation stack
- store: Redux store and slices for state management
- constants: Constants such as colors and app configurations
- helpers: Utility functions and helpers
- models: Types and models for data structures

## To get started with the project on your local environment, follow these steps:

###  Install Dependencies
```sh
    yarn install
    cd ios && pod install
```

```sh
    yarn start ios 
    yarn start android
```
## 
This command automates the process of cleaning up your React Native project's dependencies and build files. 
```sh
    yarn clean
```

