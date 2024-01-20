export const HelpingFunctions = {
  formattedDateTime: (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const dateTime = new Date(dateTimeString);
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      dateTime
    );

    return formattedDateTime;
  },
};
