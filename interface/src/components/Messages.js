import styles from '@/styles/Home.module.css';
import { useRef } from 'react';

const members = {
  me: {
    id: '1',
    clientData: {
      color: 'blue',
      username: 'Chicó',
    },
  },
  they: {
    id: '2',
    clientData: {
      color: 'red',
      username: 'João Grilo',
    },
  }
};

export default function Messages({ messages }) {
  return (
    <ul className={styles.messagesList}>
      {messages.map(message => Message(message))}
    </ul>
  );
}

function Message({ role, content, id }) {
  const member = role === 'user' ? members.me : members.they;

  const className = member.id === members.me.id ?
    `${styles.messagesMessage} ${styles.currentMember}` : styles.messagesMessage;

  return (
    <li key={id} className={className}>
      <span
        className={styles.avatar}
        style={{ backgroundColor: member.clientData.color }}
      />
      <div className={styles.messageContent}>
        <div className={styles.username}>
          {member.clientData.username}
        </div>
        <div className={styles.text}>{content.split('\n').map(item => <div>{item}</div>)}</div>
      </div>
    </li>
  );
}