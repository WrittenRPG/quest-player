# WrittenRPG - Quest Player

## Overview

`WrittenRPG - Quest Player` is a Vue.js component designed for playing interactive text-based RPG quests defined by the WrittenRPG Quest standard. It interprets and displays quest content, handles user interactions, and manages the quest state as players progress.

## Features

- Supports the WrittenRPG quest format.
- Interactive gameplay with page navigation and roll mechanics.
- Responsive design for a seamless experience across various devices.
- Dynamic quest state management based on player actions.

## Installation

To install the Quest Player in your Vue.js project, use npm:

```bash
npm install @written-rpg/quest-player
```

Or, if you prefer using yarn:

```bash
yarn add @written-rpg/quest-player
```

## Usage

After installation, import and use the Quest Player in your Vue components:

```javascript
<script setup>
import QuestPlayer from '@written-rpg/quest-player';

const questData = { /* ... An Object that adheres to the WrittenRPG Standard ... */ };
</script>

<template>
  <QuestPlayer :quest="questData" />
</template>
```

### Props

- **quest (Object):** The quest data in RPGChain format.
- **session (Object):** If loading a quest / game from a previous session, pass the session object.

### Events

- **questStart:** Emitted when the quest starts.
- **questAction:** Emitted on each action within the quest (like page navigation or roll result).
- **questComplete:** Emitted when the quest is completed.

## Contributing

Contributions to the Quest Player package are welcome. Please follow standard procedures for contributing to open-source projects on GitHub:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.