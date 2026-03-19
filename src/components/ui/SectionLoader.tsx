interface SectionLoaderProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const SectionLoader = ({ size = "md" }: SectionLoaderProps) => {
  return (
    <div className="py-20 flex justify-center items-center">
      <div
        className={`${sizeMap[size]} border-2 border-primary border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default SectionLoader;