const Notification = (props) => {
  const { message } = props;

  if (message.content === null) {
    return null;
  }

  if (message.type === "ERROR") {
    return <div className="error">{message.content}</div>;
  }

  return <div className="info">{message.content}</div>;
};

export default Notification;
