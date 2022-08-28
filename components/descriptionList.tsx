const DescriptionList = ({ items, className = '' }) => {
  return (
    <dl className={'space-y-2 ' + className}>
      {items.map(({ term, details }) => (
        <div className="flex gap-1 mobile:flex-wrap" key={term}>
          <dt className="font-bold flex-shrink-0">{term}:</dt>
          <dd>{details}</dd>
        </div>
      ))}
    </dl>
  )
}

export default DescriptionList
