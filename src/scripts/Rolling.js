export function check(dc) {
    const rollValue = Math.floor(Math.random() * 20) + 1;
    const success = rollValue >= parseInt(dc);
    return {
      value: rollValue,
      success: success
    };
  }
  