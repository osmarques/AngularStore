namespace AngularStore.Common.Models;

public class Result<T>
{
    public bool Success { get; set; }
    public string? Error { get; set; }
    public T? Data { get; set; }

    public Result() { }

    public Result(bool success, T? data, string? error)
    {
        Success = success;
        Data = data;
        Error = error;
    }

    public static Result<T> Ok(T data) => new(true, data, null);

    public static Result<T> Failure(string error) => new(false, default, error);
}

public class Result
{
    public bool Success { get; set; }
    public string? Error { get; set; }

    public Result() { }

    public Result(bool success, string? error)
    {
        Success = success;
        Error = error;
    }

    public static Result Ok() => new(true, null);

    public static Result Failure(string error) => new(false, error);
}