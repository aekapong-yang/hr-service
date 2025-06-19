interface BaseService<R, T> {
  execute(request: R): T;
}
