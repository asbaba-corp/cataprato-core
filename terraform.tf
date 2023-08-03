module "lambda"{
source        = "./terraform"

function_name =  "lambda_function_name"
filename      = "dist.zip"
handler       = "dist/lambda"
runtime       = "nodejs18.x"
}
