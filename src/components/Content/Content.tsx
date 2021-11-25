export const Content: React.FC<Icontent> = ({
  Header,
  CentralContent,
  Footer,
}) => {
  return (
    <div className="px-4 py-4 w-full mx-auto">
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
