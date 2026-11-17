export function AnnouncementBar() {
  return (
    <div className="flex h-9 items-center justify-center bg-ink px-3 text-center font-body text-caption font-medium uppercase text-white">
      <span className="md:hidden">Free delivery over ₦150,000</span>
      <span className="hidden md:inline">
        Free delivery on orders over ₦150,000
      </span>
    </div>
  );
}
