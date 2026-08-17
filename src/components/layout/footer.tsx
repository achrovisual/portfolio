import VersionBadge from "@/components/ui/version-badge";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-4 text-sm">
      <span className="text-foreground">© 2026 achrovisual</span>
      <VersionBadge />
    </footer>
  );
}
