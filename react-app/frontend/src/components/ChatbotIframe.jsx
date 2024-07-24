const ChatbotIframe = ({ src, title, width = '480px', height = '500px' }) => {
  return (
    <iframe
      src={src}
      title={title}
      width={width}
      height={height}
      style={{ border: 'none' }}
    ></iframe>
  );
};

export default ChatbotIframe;
