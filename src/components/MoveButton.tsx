export const MoveButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      className='bg-blue-500 text-white px-4 py-2 rounded self-center mt-auto mb-4 hover:bg-blue-700 transition-colors duration-300'
      onClick={onClick}
      type='button'
    >
      {text}
    </button>
  );
};
