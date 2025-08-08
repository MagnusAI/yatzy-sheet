import type { ReactNode } from 'react'
import styles from './styles/Settings.module.css'

interface SettingsModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function SettingsModal({ open, title, onClose, children }: SettingsModalProps) {
  if (!open) return null
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

