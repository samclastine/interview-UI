import styles from "./styles/dashboard.module.scss"

export default function dashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" style={{height:"100vh"}}>
        <div className={styles.hero}>
          {children}
        </div>
      </section>
    );
  }
  