resource "aws_lambda_function" "this" {
  function_name     =  var.function_name
  role              =  data.aws_iam_role.iam_for_lambda.arn
  filename          =  var.filename
  handler           =  var.handler
  runtime           =  var.runtime
  source_code_hash  =  filebase64sha256(var.filename)
}
