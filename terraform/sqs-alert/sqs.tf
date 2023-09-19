resource "aws_sqs_queue" "sqs_alert" {
  name = var.sqs_name
}
