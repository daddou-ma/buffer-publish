/*
  Replaces note in the story with the matching order.
  Returns stories array updated.
*/
const updateStoryNote = ({ stories = [], order, note }) => {
  const updatedStories = stories.map(story => {
    if (story.order === order) {
      story.note = note;
    }
    return story;
  });
  return updatedStories;
};

export default updateStoryNote;
