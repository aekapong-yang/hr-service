interface BaseService<R, T> {
  execute(request: R): Promise<T>;
}
