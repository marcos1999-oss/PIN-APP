jest.mock('react-native-reanimated', () => {
  return {
    Easing: {
      out: jest.fn()
    }
  }
});
