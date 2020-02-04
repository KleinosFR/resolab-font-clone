# Résolab

<img src="https://resolab.netlify.com/static/media/resolab-simple-white.4b7806d8.png" alt="resolab-logo" width="350px"/>

## About the project...

Résolab is a social network project, created for children.

Its aim is to initiate children into developping good habits on social media, by experimenting Résolab.

## Prerequisites

Node > 10.16.3
Npm > 6.13.6

## Getting Started

This project was bootstrapped with `create-react-app`.
[See doc here](https://github.com/facebook/create-react-app#create-react-app--)

```bash
git clone
npm install # Install all dependencies
npm start # Starts the development server
```

### Environment variables

You have to create a `.env` file in your root project directory.

```bash
# API entrypoint
REACT_APP_API_URL=http://localhost:8089/api

# API's server entry point for image's url creation.
REACT_APP_MEDIA_URL=http://localhost:8089

# WebSocket entry point for instantaneous's chat.
REACT_APP_WEBSOCKET_URL="http://localhost:8000"

# entry point for the deferred chat and stockage's messages in the database.
REACT_APP_CHAT_URL="http://localhost:8000/chatMessages"
```

## Standards

We tend to follow the [AirBnB React Styleguide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-)
We also used [Prettier](https://github.com/prettier/prettier-vscode#prettier-formatter-for-visual-studio-code) for our code's indentation 🤓
Nearly all components are functions with Hooks.
Our variables are written in camelCase. :camel:
Components are written in PascalCase.
![](https://static2.greatsong.net/artiste/96x96/pascal-obispo-2999.jpg)

## Our stack

<table>
<tbody>
<tr>
<td>
<img src="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK.png" alt="react" width="200"/>
</td>
<td>
<img src="https://i2.wp.com/programmingwithmosh.com/wp-content/uploads/2019/01/Redux.png?resize=367%2C287&ssl=1" alt="react" width="300"/>
</td>
<td>
<img src="https://www.stickpng.com/assets/images/58480f66cef1014c0b5e4938.png" alt="material" width="250"/>
</td>
</tr>
<tr></tr>
</tbody>
</table>

- [React](https://fr.reactjs.org/docs/getting-started.html)
- [Redux](https://redux.js.org/)
- [Material-UI](https://material-ui.com/)
- [Axios](https://github.com/axios/axios#axios)

## How do we name our files and line up them

Our project contains a common interface, which is used at both for the `userpage` and `moderatorpage`.

```bash
src
├── AdminPage # all components relative to the administration panel
├── Assets # pictures and logos for the website
├── Layout
├── LoginPage # specific to the LoginPage
├── ModeratorPage # special features and files for ModeratorPage
├── SettingsPage # used as route for back-office management
├── UserPage # special features and files for UserPage
├── commonComponent # components which are used both for UserPage and ModeratorPage
│ ├── Chat # components for Chat
│ │ ├── DisplayContacts # display for contacts list on Chat
│ │ └── messages # components for Messages
│ ├── Notifications # Notifications for a Publication (like, comment)
│ ├── Publications # Parent component for a Publication
│ │ └── Comments # comments for a Publication
│ └── Stories # 24 hours fleeting Publications
├── hooks # custom hooks
├── reducers # for Redux
└── utils # useful functions
```

So the common components are in the `commonComponent` folder.

You will find on this folder subfolders in relation with the different constitutive components of the project (such as `Chat`, `Comments`, `Notifications`...)

`adminPage` part is used as Back-office part for the users's registration and management.

## Who are we?

We are a 5 developpers team who did this project, formed of 4 front-end developers in _React/JS_ and one back-end developper in PHP.

### _Front-end developpers React/JS & back-end developpers Node/JS:_

 <div style="display:flex;flex-direction:row;">
	<div style="display:flex;flex-direction:column;">
		<div><img src="https://avatars1.githubusercontent.com/u/53374849?s=60&v=4" /></div>
		<div>Stéphane Lavaud</div>
	</div>

[_Github_](https://github.com/KleinosFR)

[_Linkedin_](https://www.linkedin.com/in/stephane-lavaud-webdev/)

 <div style="display:flex;flex-direction:row;">
	<div style="display:flex;flex-direction:column;">
		<div><img src="https://avatars0.githubusercontent.com/u/52760709?s=60&v=4" width="60px"/></div>
		<div>Angélique Wons</div>
	</div>

[_Github_](https://github.com/angelique-w)

[_Linkedin_](https://www.linkedin.com/in/ang%C3%A9lique-wons/)

### _Front-end developpers React/JS:_

<div style="display:flex;flex-direction:row;">
	<div style="display:flex;flex-direction:column;">
		<div><img src="https://avatars2.githubusercontent.com/u/54865651?s=60&v=4" /></div>
		<div>Clara Desperben</div>
	</div>

[_Github_](https://github.com/clarade)

[_Linkedin_](https://www.linkedin.com/in/clara-desperben/)

 <div style="display:flex;flex-direction:row;">
	<div style="display:flex;flex-direction:column;">
		<div><img src="https://avatars3.githubusercontent.com/u/46849585?s=60&v=4" /></div>
		<div>Monia Polus</div>
	</div>

[_Github_](https://github.com/Monia64)

[_Linkedin_](https://www.linkedin.com/in/monia-polus/)

### _Back-end developper PHP:_

 <div style="display:flex;flex-direction:row;">
	<div style="display:flex;flex-direction:column;">
		<div><img src="https://avatars1.githubusercontent.com/u/55102862?s=60&v=4" width="60px"/></div>
		<div>Anne-Claire Nanot</div>
	</div>

[_Github_](https://github.com/anneclaire64)

[_Linkedin_](https://www.linkedin.com/in/anne-claire-nanot/)
