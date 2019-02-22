import {
  fontFamily,
} from '@bufferapp/components/style/font';

export default {
  errorBoundary: {
    fontFamily,
    alignItems: 'center',
    backgroundImage: 'radial-gradient(circle closest-side, #fffaed,#fff)',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
    position: 'relative',
    textAlign: 'center',
    width: '100vw',
  },
  errorBoundaryTitle: {
    color: '#363c40',
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '20px',
  },
  errorBoundaryMessage: {
    color: '#898989',
    fontSize: '18px',
    marginBottom: '20px',
    lineHeight: '26px',
  },
  buttonWrapper: {
    display: 'flex',
  },
  buttonText: {
    marginLeft: '0.5rem',
  },
};
