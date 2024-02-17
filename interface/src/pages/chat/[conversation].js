import Input from '@/components/Input';
import Messages from '@/components/Messages';
import styles from '@/styles/Home.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const conversationId = router.query.conversation;
  const API_ADDRESS = 'http://localhost:4000/api/gpt/chat';

  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${API_ADDRESS}/${conversationId}`);
      setMessages(data.messages);
    } catch {
      setMessages([]);
    }
  }

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  const onSendMessage = async (message) => {
    setMessages(prevState => [...prevState, {
      id: "temp_id",
      content: message,
      role: 'user',
      conversationId
    }]);

    await axios.post(`${API_ADDRESS}/message`,
      {
        role: "user",
        content: message,
        conversationId
      });

    fetchMessages();
  }

  return (
    <main className={styles.app}>
      <div className={styles.appContent}>
        <Messages messages={messages} />
        <Input onSendMessage={onSendMessage} />
      </div>
    </main>
  )
}
