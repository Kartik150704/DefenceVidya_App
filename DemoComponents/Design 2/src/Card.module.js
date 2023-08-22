import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 10,
    padding: 16,
    borderRadius: 10,
    boxSizing: 'border-box',
    transitionProperty: 'transform, box-shadow, opacity',
    transitionDuration: '0.3s',
    willChange: 'transform, box-shadow, opacity',
  },
  cardHover: {
    transform: [{ scale: 1.03 }],
    shadowOffset: { width: 0, height: 20 },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOpacity: 1,
  },
  cardImage: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 10,
  },
  cardTitle: {
    margin: 0,
    marginTop: 16,
    fontSize: 18,
  },
  cardDescription: {
    margin: 0,
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  btnn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default Styles;
