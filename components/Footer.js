const Footer = () => {
  const currentDate = new Date();
  const dateToday = `${currentDate.getDate()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()} | ${currentDate.getHours()}:${currentDate.getMinutes()}`;

  return (
    <div>
      <footer className="flex flex-col items-center justify-center w-full h-24 border-t">
        <p>Created by @ Gabriel P. </p>
        <p>Date: {dateToday}</p>
      </footer>
    </div>
  );
};

export default Footer;
