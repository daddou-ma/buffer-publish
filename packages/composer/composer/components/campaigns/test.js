import { getSelected } from './CampaignHeader';

describe('getSelected', () => {
  const campaigns = [
    { name: '#SaveOurSeasWeek', color: '#9C2BFF', id: '1' },
    { name: 'Hello World', color: 'blue', id: '2' },
  ];
  const noneSelected = { name: 'None selected' };
  it('should return first campaign in array', () => {
    const selected = getSelected({ campaigns, campaignId: null });
    expect(selected).toEqual(campaigns[0]);
  });
  it('should return campaign associated with campaignId', () => {
    const selected = getSelected({ campaigns, campaignId: '2' });
    expect(selected).toEqual(campaigns[1]);
  });
  it('should return none selected if no campaigns are created', () => {
    const selected = getSelected({ campaigns: [], campaignId: null });
    expect(selected).toEqual(noneSelected);
  });
  it('should return none selected if campaginId doesnt match campaigns', () => {
    const selected = getSelected({ campaigns, campaignId: '5' });
    expect(selected).toEqual(noneSelected);
  });
});
