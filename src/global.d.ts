declare module '*.css' {
  interface IClassNames {
    [cls: string]: string
  }
  const cls: IClassNames;
  export = cls;
}