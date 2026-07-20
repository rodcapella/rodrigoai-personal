interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * The chat experience is currently disabled.
 * Keep this inert component so existing imports remain compatible.
 */
const ChatWidget = (_props: ChatWidgetProps) => null;

export default ChatWidget;
