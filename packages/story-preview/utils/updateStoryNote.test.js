import updateStoryNote from './updateStoryNote';

describe('updateStoryNote', () => {
  it('returns stories with updated note', () => {
    const stories = [
      {
        order: 1,
        note: '',
      },
      {
        order: 2,
        note: 'Note2',
      },
    ];

    const updatedNoteData = {
      order: 2,
      note: 'Amazing Note',
      stories,
    };

    const updatedStories = [
      {
        order: 1,
        note: '',
      },
      {
        order: 2,
        note: 'Amazing Note',
      },
    ];

    expect(updateStoryNote(updatedNoteData)).toEqual(updatedStories);
  });

  it('returns empty array if stories are undefined', () => {
    const stories = undefined;

    const updatedNoteData = {
      order: 2,
      note: 'Amazing Note',
      stories,
    };

    const updatedStories = [];

    expect(updateStoryNote(updatedNoteData)).toEqual(updatedStories);
  });
});
