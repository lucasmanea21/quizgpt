// components/ShareRoomButton.tsx

const ShareRoomButton = ({ roomId }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join my Quiz Room",
        text: "Join my Quiz Room on Awesome Quiz App!",
        url: `${window.location.origin}/rooms/${roomId}`,
      });
    } else {
      // Fallback for browsers that do not support Navigator.share (copy link to clipboard, etc.)
    }
  };

  return <button onClick={handleShare}>Share Room</button>;
};

export default ShareRoomButton;
