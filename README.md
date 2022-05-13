# BankClient App

App para capturar, enviar y validar fotos documentos de identidad a través de una API

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

## 🔧 Herramientas.

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

  This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🏃 Ejecución.

Para la ejecución en local con `yarn start` sin conexión https es necesario deshabilitar ciertas opciones de seguridad en chrome. En caso contrario no se podrá acceder a la cámara del dispositivo.

1. Acceder a `chrome://flags/#unsafely-treat-insecure-origin-as-secure`.
2. Buscar y habilitar "insecure origins treated as secure".
3. Añadir las direcciones en las que queremos ingnorar las políticas de seguridad. Por ejemplo `localhost`.
4. Guardar y reiniciar chrome.

## ⚙️ Funcionamiento.

Inicialmente el usuario ve una pantalla con las instrucciones para iniciar la validación de su documento de identidad y un botón de acción.

Al pulsar el botón se inicia la captura desde la cámara. El usuario dispone de una zona en la que encuadrar su documento de identidad. La aplicación detecta automáticamente cuando se enfoca dicho documento, realiza una captura y la envía al backend.

Una vez enviado se vuelve a la pantalla anterior, donde se informa al usuario si la captura de su documento ha sido validada o no. En caso de resultado negativo se le ofrece la opción de volver a escanear el documento.

Internamente la aplicación calcula el color medio de la imagen capturada y lo compara con unos valores máximos y mínimos para cada canal almacenados en `constants/id.ts`.

### 🌠 Rendimiento.

Dado que el proceso de detección del documento se intenta realizar en tiempo real, pueden producirse problemas de rendimiento en algunos dispositivos.

## 👌 Alternativas y mejoras.

En cuanto al proceso de detección, lo natural sería usar TensorFlow o una libreía similar para identificar el documento durante la captura. Desgraciadamente habría que entrenar un modelo, ya que parece no haber ninguno pre-entrenado (https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts)

Respecto a la aplicación en general.

- \[ ] Añadir más y mejores test.
- \[ ] Si no se puede caturar la imagen de otra forma, mejorar el rendimiento y precisión de esta "detección por color". Seguramente se podría dividir la imagen en sectores para realizar comparaciones con las distinatas partes del documento de identidad.
- \[ ] Mejorar la experiencia de usuario con algun mensaje cuando no se puede tener acceso a la cámara.
- \[ ] Seleccionar automáticamente siempre la cámara adecuada.
- \[ ] Convertir en una aplicación web progresiva que pueda iniciarse sin conexión.
