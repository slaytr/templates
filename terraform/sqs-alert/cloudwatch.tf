resource "aws_cloudwatch_metric_alarm" "age_of_oldest" {
  alarm_name          = "age_of_oldest"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  period              = 10
  threshold           = 120
  statistic           = "Maximum"
  namespace           = "AWS/SQS"
  metric_name         = "AgeOfOldest"
  dimensions = {
    QueueName = aws_sqs_queue.sqs_alert.name
  }
}
