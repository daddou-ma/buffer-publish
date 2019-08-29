const isValidCtaString = splitCta => splitCta.length === 5;

const getCtaProperties = (cta) => {
  if (cta) {
    const splitCta = cta.split('-');
    if (isValidCtaString(splitCta)) {
      const [ctaApp, ctaView, ctaLocation, ctaButton, ctaVersion] = splitCta;
      return {
        cta,
        ctaApp,
        ctaView,
        ctaLocation,
        ctaButton,
        ctaVersion,
      };
    }
    return { cta };
  }
  return { cta: null };
};

export default getCtaProperties;
