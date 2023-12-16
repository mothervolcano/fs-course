import { NotificationMessage } from "../types";

interface NotificationProps {
  message: NotificationMessage | null;
}

const errorStyle = {
  color: 'red'
}

const infoStyle = {
  color: 'blue'
}

const Notification = (props: NotificationProps) => {
  const { message } = props;

  if (message === null) {
    return null;
  }

  if (message.type === "ERROR") {
    return <div style={errorStyle}>{message.content}</div>;
  }

  return <div style={infoStyle}>{message.content}</div>;
};

export default Notification;
