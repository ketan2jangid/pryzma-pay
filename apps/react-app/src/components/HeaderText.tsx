export enum HeaderSize {
  Small,
  Medium,
  Large
}

interface HeaderTextParams {
  size?: HeaderSize
}

function HeaderText({ size }: HeaderTextParams) {
  return (
    <h1 className={`${size == HeaderSize.Small ? "text-3xl" : size == HeaderSize.Medium ? "text-5xl" : "text-7xl"} font-bold bg-gradient-to-t from-neon via-neon/75 to-neon/30 text-transparent bg-clip-text`}>PryzmaPay</h1>
  )
}

export default HeaderText;