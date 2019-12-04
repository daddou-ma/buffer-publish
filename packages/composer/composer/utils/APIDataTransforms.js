const extractSavedUpdatesIdsFromResponses = responses =>
  Array.prototype.concat.apply(
    [],
    responses.map(response =>
      Array.isArray(response.updates)
        ? response.updates.map(update => update.id)
        : typeof response.update !== 'undefined'
        ? [response.update.id]
        : []
    )
  );

export { extractSavedUpdatesIdsFromResponses };
