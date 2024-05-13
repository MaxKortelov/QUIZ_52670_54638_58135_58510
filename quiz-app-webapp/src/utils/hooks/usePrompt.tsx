import { useCallback, useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { Modal } from 'antd';

function useConfirmExit(confirmExit: (confirmNavigation: () => void) => void, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    navigator.push = (...args: Parameters<typeof push>) => {
      const confirm = () => push(...args);
      confirmExit(confirm);
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, confirmExit, when, confirm]);
}

export function usePrompt(message: string, when = true) {
  useEffect(() => {
    if (when) {
      window.onbeforeunload = function () {
        return message;
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  const confirmExit = useCallback(
    (confirmNavigation: () => void) => {
      Modal.confirm({
        className: 'confirmNavigationModal',
        title: 'Confirm',
        content: message,
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => confirmNavigation(),
      });
    },
    [message],
  );

  useConfirmExit(confirmExit, when);
}
