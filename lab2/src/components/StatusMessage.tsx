interface StatusMessageProps {
  type: 'loading' | 'error' | 'empty';
  message?: string;
  onRetry?: () => void;
}

export function StatusMessage({ type, message, onRetry }: StatusMessageProps) {
  if (type === 'loading') {
    return (
      <div className="card status-box loading">
        <div className="spinner" />
        <p>{message || 'Завантаження даних із World Bank API...'}</p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="card status-box error">
        <p className="status-title">Помилка завантаження</p>
        <p className="status-text">{message || 'Не вдалося завантажити дані з сервера.'}</p>
        {onRetry && (
          <button type="button" className="btn-retry" onClick={onRetry}>
            Спробувати знову
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card status-box empty">
      <p className="status-title">Дані відсутні</p>
      <p className="status-text">{message || 'Не знайдено жодного запису для відображення.'}</p>
    </div>
  );
}
