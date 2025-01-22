const mdxComponents = {
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
      <h1 className="text-4xl font-bold text-black dark:text-white mb-8" {...props} />
    ),
    h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6" {...props} />
    ),
    h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4" {...props} />
    ),
    h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
      <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2" {...props} />
    ),
    p: (props: React.ComponentPropsWithoutRef<"p">) => (
      <p className="text-black dark:text-white mb-6" {...props} />
    ),
    ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
      <ul className="list-disc pl-6 text-gray-700 dark:text-white mb-6" {...props} />
    ),
    a: (props: React.ComponentPropsWithoutRef<"a">) => (
      <a className="text-orange-500 hover:text-orange-300 transition-colors underline" {...props} />
    ),
    blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:text-gray-400 mb-6"
        {...props}
      />
    ),
    hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
       <hr className="mb-6 border-gray-300 dark:border-gray-600" />
    ),
    ins: (props: React.ComponentPropsWithoutRef<"ins">) => (
        <ins className="mb-6" {...props}/>
    ),
  };

  export { mdxComponents };