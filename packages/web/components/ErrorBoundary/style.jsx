import { fontFamily } from '@bufferapp/ui/style/fonts';

const errorBoundary = {
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
  boxSizing: 'border-box',
};

const errorBoundaryFit = {
  fontFamily,
  alignItems: 'center',
  backgroundImage: 'radial-gradient(circle closest-side, #fffaed,#fff)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  position: 'relative',
  textAlign: 'center',
  width: '100%',
  boxSizing: 'border-box',
};

const errorBoundaryBordered = {
  ...errorBoundaryFit,
  backgroundImage: 'none',
  padding: '24px 0',
  border: '1px solid #b8b8b8',
  borderRadius: '4px',
};

export default {
  errorBoundary,
  errorBoundaryFit,
  errorBoundaryBordered,
  errorBoundaryTitle: {
    color: '#3d3d3d',
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '20px',
  },
  errorSmallBoundaryTitle: {
    color: '#3d3d3d',
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  errorBoundaryMessage: {
    color: '#636363',
    fontSize: '18px',
    marginBottom: '20px',
    lineHeight: '26px',
  },
  errorSmallBoundaryMessage: {
    color: '#636363',
    fontSize: '16px',
    marginBottom: '8px',
    lineHeight: '22px',
  },
  smallErrorBoundaryMessage: {
    color: '#636363',
    fontSize: '12px',
  },
  buttonWrapper: {
    display: 'flex',
  },
  buttonText: {
    marginLeft: '0.5rem',
  },
  pre: {
    textAlign: 'left',
    width: '100%',
  },
};
