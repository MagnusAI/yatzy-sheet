import controls from './styles/Controls.module.css'

interface SettingsButtonProps {
  onClick: () => void
}

export function SettingsButton({ onClick }: SettingsButtonProps) {
  return (
    <div className={controls.topRightControls}>
      <button className={controls.resetButton} onClick={onClick} title="Settings">⚙️</button>
    </div>
  )
}

