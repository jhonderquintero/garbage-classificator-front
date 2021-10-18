export const Content: React.FC<Icontent> = ({
  Header,
  CentralContent,
  Footer,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {Header}

      {CentralContent}

      {Footer}
    </div>
  );
};

interface Icontent {
  Header?: JSX.Element;
  CentralContent?: JSX.Element;
  Footer?: JSX.Element;
}
