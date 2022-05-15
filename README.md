# BankClient App

Web app to capture, send and validate identity documents photos through an API.

DEMO: 🚀 https://lively-sprinkles-23a32e.netlify.app/

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a865216-7be6-4d77-bc42-29c48766d0c1/deploy-status)](https://app.netlify.com/sites/lively-sprinkles-23a32e/deploys)

<hr>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RECOIL](https://img.shields.io/badge/-recoil-3578E5?style=for-the-badge)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![PRETTIER](https://img.shields.io/badge/-Prettier-1A2B34?style=for-the-badge)

## 🔧 Tools.

- [React.js](https://reactjs.org)
- [Typescript](https://www.typescriptlang.org/)
- [Recoil](https://recoiljs.org/es)
- [Styled Components](https://styled-components.com/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io)
- [InVison](https://www.invisionapp.com/home)
- [Vscode](https://code.visualstudio.com/)
- [Vscode "Prettier" extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vscode "px to rem" extension](https://marketplace.visualstudio.com/items?itemName=sainoba.px-to-rem)
- [Vscode "ESLint" extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- https://www.favicon-generator.org/

## 🏃 Execution.

To run the local dev server without `https`, we will need to disable some security options in chrome. Otherwise, we wil not be able to access the device camera.

1. Go to `chrome://flags/#unsafely-treat-insecure-origin-as-secure`.
2. Search and disable "insecure origins treated as secure".
3. Add the addresses in which we want to ignore the security policies. For example `localhost`.
4. Close and re-open.

## ⚙️ Operation.

First, the user sees a screen with the instructions to start the validation of their ID document and an action button.

Pressing the button the camera capture stars. The user will see an area where to fit their document. The app will automatically detect when the document is in focus, take a screenshot, and send it to the back-end.

After sending the document to the back-end, the app shows the previous screen, with information about whether the document has been validated by the back-end. If the answer was negative, the application displays a button to re-try the process.

Internally, the app calculates the image average color, and compares it against a minimum and maximum in each color channel, stored in `constants/id.ts` .

### 🌠 Performance.

After each detection tries, we introduced a delay in milliseconds defined by the value of `ID_CHECK_PROCESS_DELAY` in `constants/id.ts`. The default value is 100. A high value can make the interface more responsive, but a worse camera visualization experience.

## 👌 Alternatives and enhancements.

For the detection process, it would be best to run an AI-assisted detection, with a library such as TensorFlow. Unfortunately, there are no pre-trained algorithms capable of detecting an ID card: [https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts)

As for the app:

- \[ ] Include more and better tests, especially in the ID card detection logic.
- \[ ] Increase the code coverage in the test.
- \[ ] If we are unable to implement an AI detection system, enhance this rudimentary color detection. Maybe it can be boosted with a quadrant division on the image, in order to compare different zones in the ID card.
- \[ ] Better user experience, with information about possible errors, like camera exceptions and permission-related problems.
- \[ ] Adapt the app to landscape format or inform the user about the required orientation.
- \[ ] Upgrade to a progressive web app, capable to start without internet connection.
