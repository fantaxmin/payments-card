import '../../styles/components/Header.css'

interface HeaderProps {
  pendingCount: number
  overdueCount: number
}

export const Header = ({ pendingCount, overdueCount }: HeaderProps) => {
  return (
    <header className="header">
      <h1>Cobros Pendientes</h1>
      <div className="status-badges">
        <span className="badge badge-pending">{pendingCount} Pendientes</span>
        <span className="badge badge-overdue">{overdueCount} Vencidos</span>
      </div>
    </header>
  )
}
